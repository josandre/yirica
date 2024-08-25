# syntax = docker/dockerfile:1

ARG RUBY_VERSION=3.3.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

WORKDIR /rails

ARG ENVIRONMENT=production
ENV ENVIRONMENT=${ENVIRONMENT}

ENV RAILS_ENV=${ENVIRONMENT} \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    NODE_ENV=${ENVIRONMENT}

ARG PORT=443
ENV PORT=${PORT}

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY=${RAILS_MASTER_KEY}

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential curl git libvips node-gyp pkg-config python-is-python3

ARG NODE_VERSION=22.4.0
ARG YARN_VERSION=1.22.19
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    npm install -g yarn@$YARN_VERSION && \
    rm -rf /tmp/node-build-master

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn add esbuild --dev
RUN yarn add esbuild-sass-plugin@latest --dev

COPY . .

RUN bundle exec bootsnap precompile app/ lib/

# Provide dummy values for the environment variables during build time if not provided
ENV SECRET_KEY_BASE="dummy_secret_key_base"
ENV DEVISE_JWT_SECRET_KEY="dummy_secret_key"

RUN ./bin/rails assets:precompile

FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

RUN useradd -m rails --shell /bin/bash && \
    chown -R rails:rails /rails && \
    chmod +x /rails/bin/docker-entrypoint

USER rails:rails

EXPOSE ${PORT}

ENTRYPOINT ["/rails/bin/docker-entrypoint"]

CMD ./bin/rails server -b 0.0.0.0 -p ${PORT}

