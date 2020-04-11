FROM java:7

ENV RELEASE_DATE 2019-03-13
ENV H2DATA /root

RUN curl http://www.h2database.com/h2-$RELEASE_DATE.zip -o h2.zip \
    && unzip h2.zip -d . \
    && rm h2.zip

RUN ln -s $(ls /h2/bin/*jar) /h2/bin/h2.jar

RUN mkdir /docker-entrypoint-initdb.d

VOLUME $H2DATA

EXPOSE 8082 9092

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD java -cp /h2/bin/h2.jar org.h2.tools.Server -web -webAllowOthers \
    -webPort 8082 -tcp -tcpAllowOthers -tcpPort 9092 -baseDir $H2DATA
