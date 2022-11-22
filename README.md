# Bem vindo ao As-Maney

Este é um projeto para alunos de programação, o projeto consiste em fixar conhecimentos utilizando tecnologias como React, Typescript, gerenciamento de estado e todo o conhecimento adquirido até o momento.

## Projeto

Porque ?

O projeto surgiu de uma necessidade, com base na dificuldade de toda vez estar anotando os gastos em planilhas ou até mesmo em folhas, criei a aplicação para estar de uso fácil e rápido, como por exemplo no celular onde a todo o momento nós estamos com ele em maõs.

## Como rodar o projeto - Front-end

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

## `Back-end`

O projeto tem alguns end-points, o back-end foi desenvolvido através do `json-server`, uma ferramenta que nós permite criar end-points "falsos" para testar nossa aplicação front-end. Para mais informações sobre a ferramenta acesse https://www.npmjs.com/package/json-server.

Para rodar os end-points, abra um terminal a parte ou até mesmo o próprio terminal do VsCode e dê o seguinte comando : yarn server caso esteja usando o YARN, ou npm server caso esteja usando o NPM, e está pronto, nosso back end rodará na porta http://localhost:3333/.

## End-Points

transactions - Transações.
transactions/${id} - Caso queira acessar alguma transação específica.
