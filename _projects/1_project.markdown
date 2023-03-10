---
layout: page
title: Sentivi
description: A simple tool for sentiment analysis which is a wrapper of scikit-learn and PyTorch Transformers models. It is made for easy and faster pipeline to train and evaluate several classification algorithms.
img: /assets/img/12.jpg
importance: 1
---

## A Simple Tool For Sentiment Analysis

**[Sentivi](https://github.com/vndee/sentivi)** - a simple tool for sentiment analysis which is a wrapper of [scikit-learn](https://scikit-learn.org) and
[PyTorch Transformers](https://huggingface.co/transformers/) models (for more specific purpose, it is recommend to use native library instead). It is made for easy and faster pipeline to train and evaluate several
classification algorithms.

Documentation: [https://sentivi.readthedocs.io/en/latest/index.html](https://sentivi.readthedocs.io/en/latest/index.html)

### Classifiers

-  Decision Tree
-  Gaussian Naive Bayes
-  Gaussian Process
-  Nearest Centroid
-  Support Vector Machine
-  Stochastic Gradient Descent
-  Character Convolutional Neural Network
-  Multi-Layer Perceptron
-  Long Short Term Memory
-  Text Convolutional Neural Network
-  Transformer
-  Ensemble
-  Lexicon-based 

### Text Encoders

-  One-hot
-  Bag of Words
-  Term Frequency - Inverse Document Frequency
-  Word2Vec
-  Transformer Tokenizer (for Transformer classifier only)
-  WordPiece
-  SentencePiece

### Install
- Install legacy version from PyPI:
    ```bash
    pip install sentivi
    ```

- Install latest version from source:
    ```bash
    git clone https://github.com/vndee/sentivi
    cd sentivi
    pip install .
    ```

### Example

```python
from sentivi import Pipeline
from sentivi.data import DataLoader, TextEncoder
from sentivi.classifier import SVMClassifier
from sentivi.text_processor import TextProcessor

text_processor = TextProcessor(methods=['word_segmentation', 'remove_punctuation', 'lower'])

pipeline = Pipeline(DataLoader(text_processor=text_processor, n_grams=3),
                    TextEncoder(encode_type='one-hot'),
                    SVMClassifier(num_labels=3))

train_results = pipeline(train='./data/dev.vi', test='./data/dev_test.vi')
print(train_results)

pipeline.save('./weights/pipeline.sentivi')
_pipeline = Pipeline.load('./weights/pipeline.sentivi')

predict_results = _pipeline.predict(['h??ng ok ?????u tu??p c?? m???t s??? kh??ng v???a ???c si???t. ch??? ???????c m???t s??? ?????u th??i .c???n '
                                    'nh???t ?????u tu??p 14 m?? kh??ng c??. kh??ng ?????t y??u c???u c???a m??nh s??? d???ng',
                                    'Son ?????pppp, m??i h????ng vali th??m nh??ng h??i n???ng, ch???t son m???n, m??u l??n chu???n, '
                                    '?????ppppp'])
print(predict_results)
print(f'Decoded results: {_pipeline.decode_polarity(predict_results)}')
```
Take a look at more examples in [example/](https://github.com/vndee/sentivi/tree/master/example).

### Pipeline Serving

Sentivi use [FastAPI](https://fastapi.tiangolo.com/) to serving pipeline. Simply run a web service as follows:

```python
# serving.py
from sentivi import Pipeline, RESTServiceGateway

pipeline = Pipeline.load('./weights/pipeline.sentivi')
server = RESTServiceGateway(pipeline).get_server()

```

```bash
# pip install uvicorn python-multipart
uvicorn serving:server --host 127.0.0.1 --port 8000
```
Access Swagger at http://127.0.0.1:8000/docs or Redoc http://127.0.0.1:8000/redoc. For example, you can use
[curl](https://curl.haxx.se/) to send post requests:

```bash
curl --location --request POST 'http://127.0.0.1:8000/get_sentiment/' \
     --form 'text=Son ?????pppp, m??i h????ng vali th??m nh??ng h??i n???ng'

# response
{ "polarity": 2, "label": "#POS" }
```

#### Deploy using Docker
```dockerfile
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY . /app

ENV PYTHONPATH=/app
ENV APP_MODULE=serving:server
ENV WORKERS_PER_CORE=0.75
ENV MAX_WORKERS=6
ENV HOST=0.0.0.0
ENV PORT=80

RUN pip install -r requirements.txt
```

```bash
docker build -t sentivi .
docker run -d -p 8000:80 sentivi
```

### Future Releases

- Lexicon-based
- CharCNN
- Ensemble learning methods
- Model serving (Back-end and Front-end)
