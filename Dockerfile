FROM ubuntu:16.04

# Dockerfile based on https://github.com/nodejs/docker-node/blob/master/6.4/slim/Dockerfile

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
# Out current version of grutn requires node 7. Try updated grunt to use a newer version of node
# Or seperate this grunt into it's own container and remove from main project
ENV NODE_VERSION 7.10.1
ENV NODE_ENV dev

RUN buildDeps='xz-utils curl ca-certificates' \
    && set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
    && apt-get purge -y --auto-remove $buildDeps

# Install yarn and feathers-cli
# RUN npm install -g yarn feathers-cli

# Install grunt
RUN npm install -g grunt-cli

# Install Git
RUN add-apt-repository -y ppa:git-core/ppa;\
  apt-get update;\
  apt-get -y install git

# Install Zsh
# RUN apt-get update && apt-get install zsh -y
RUN apt-get install zsh -y
# RUN curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
RUN git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh \
      && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
      && chsh -s /bin/zsh

# Install Meteor
# RUN apt-get install curl
# RUN curl https://install.meteor.com/ | sh

# Create app directory
RUN mkdir -p /usr/src/app

# Clone from repo
# - Make sure known hosts is updated first (no way to assume 'yes' in git clone)
# RUN ssh -T -o StrictHostKeyChecking=no git@github.com
# RUN git clone git@github.com:mosswoodcreative/feathers-chat-docker.git /usr/src/app

# @TODO: Try just pointing the volume to an existing codebase on the host
WORKDIR /usr/src/app
RUN cd /usr/src/app

# Install app dependencies
# RUN yarn install

# EXPOSE 3000
# CMD [ "npm", "start" ]
CMD [ "node" ]
