module ComprehendHelper
  require 'aws-sdk-comprehend'

  def detect_sentiment(text)
    comprehend_client = Aws::Comprehend::Client.new(
      region: 'us-east-1'
    )
    sentiment_response = comprehend_client.detect_sentiment({
                                                              text: text,
                                                              language_code: 'en'
                                                            })
    sentiment_response.sentiment
  end

end
