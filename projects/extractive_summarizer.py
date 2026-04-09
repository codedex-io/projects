import re
import heapq
import nltk
nltk.download('stopwords')
nltk.download('punkt')
def extractive_summarizer(content):
  sent_list = sentences = nltk.sent_tokenize(content)
  corpus = []
  for i in range(len(sentences)):
      dic = re.sub('[^a-zA-Z]',' ',sentences[i])
      corpus.append(dic)
  stopwords = nltk.corpus.stopwords.words('english')
  extra_stopwords = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','.',',']
  stopwords.extend(extra_stopwords)
  spec_char = ' !@#$%^&*()_+{}|:M<>?>,./;][=-\1234567890'
  exact_word_frequencies = {}
  word_frequencies = {}
  for word in nltk.word_tokenize(content.lower()):
    if word not in stopwords and word not in spec_char:
        if word not in word_frequencies.keys():
            word_frequencies[word] = 1
        else:
            word_frequencies[word] += 1
  exact_word_frequencies = dict(sorted(word_frequencies.items(), key=lambda item: item[1],reverse = True))
  maximum_frequncy = max(exact_word_frequencies.values())

  for word in exact_word_frequencies.keys():
    word_frequencies[word] = (exact_word_frequencies[word]/maximum_frequncy)
  sentence_scores = {}
  for sent in corpus:
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_frequencies.keys():
            if len(sent.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word]
                else:
                    sentence_scores[sent] += word_frequencies[word]
  summary_sentences = heapq.nlargest(round(0.2*len(corpus)), sentence_scores, key=sentence_scores.get)

  summary = '.'.join(summary_sentences)
  summary = summary.replace('  ',',') 
  return summary
