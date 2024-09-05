module ComprehendHelper
  require 'aws-sdk-comprehend'

  def detect_sentiment(text)
    credentials = Aws::Credentials.new('AKIAV53HSF3ULLOTSJQU', 'FtesGLe4Vw4N3regbps5VUDqFhLi5FCMgDQ4TmPk')
    comprehend_client = Aws::Comprehend::Client.new(
      region: 'us-east-1',
      credentials: credentials
    )
    sentiment_response = comprehend_client.detect_sentiment({
                                                              text: text,
                                                              language_code: 'en'
                                                            })
    sentiment_response.sentiment
  end

end
