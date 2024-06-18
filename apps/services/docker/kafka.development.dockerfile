FROM wurstmeister/kafka:latest

LABEL author="Rachit Srivastava"
WORKDIR /var/www/creators-treat


# To build:
# docker build -f node.development.dockerfile --tag boilerplatetest ../