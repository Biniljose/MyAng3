FROM microsoft/mssql-server-windows-express:latest

RUN mkdir C:\\SQLServer

COPY FavoriteNewsStore.mdf C:\\SQLServer
COPY FavoriteNewsStore_log.ldf C:\\SQLServer

ENV SA_PASSWORD='Test1234'
ENV ACCEPT_EULA='Y'

ENV attach_dbs='[{"dbName":"FavoriteNewsStore","dbFiles":["C:\\SQLServer\\FavoriteNewsStore.mdf","C:\\SQLServer\\FavoriteNewsStore_log.ldf"]}'