/* Arquivo de criação do banco de dados.
** Estruturas de tabelas e relacionamentos.
*/

//--------------------------------------------------------------------------------------------- USUÁRIO
CREATE TABLE IF NOT EXISTS usuario(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    telefone TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_usr INTEGER NOT NULL DEFAULT 1 -- Flag para inativar cadastros em vez de deletá-los do banco de dados

);


//--------------------------------------------------------------------------------------------- VEÍCULO
CREATE TABLE IF NOT EXISTS veiculo(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proprietario_id INTEGER NOT NULL,
    placa TEXT UNIQUE NOT NULL,
    marca TEXT,
    modelo TEXT,
    ano INTEGER,
    combustivel TEXT,
    cor TEXT,
    direcao TEXT,
    cambio TEXT,
    motor TEXT,
    km_atual INTEGER DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_vcl INTEGER NOT NULL DEFAULT 1,

    FOREIGN KEY(proprietario_id) REFERENCES usuario(id) ON DELETE CASCADE

);


//--------------------------------------------------------------------------------------------- MANUTENÇÃO DO VEÍCULO
CREATE TABLE IF NOT EXISTS manutencao(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_realizada DATETIME DEFAULT CURRENT_TIMESTAMP,
    veiculo_id INTEGER NOT NULL,
    tipo_manutencao_id INTEGER NOT NULL,
    valor REAL,
    forma_pagamento TEXT,
    km_atual_manutencao INTEGER DEFAULT 0,
    status_mntc INTEGER NOT NULL DEFAULT 1,
    mecanico_id INTEGER NOT NULL,

    FOREIGN KEY(veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE,
    FOREIGN KEY(tipo_manutencao_id) REFERENCES tipo_manutencao(id) ON DELETE CASCADE,
    FOREIGN KEY(mecanico_id) REFERENCES mecanico(id) ON DELETE CASCADE

);


//--------------------------------------------------------------------------------------------- TIPO DE MANUTENÇÃO REALIZADA
CREATE TABLE IF NOT EXISTS tipo_manutencao(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    intervalo_km INTEGER,
    intervalo_meses INTEGER,
    status_tpmntc INTEGER NOT NULL DEFAULT 1

);


//--------------------------------------------------------------------------------------------- OFICINA MECÂNICA
CREATE TABLE IF NOT EXISTS oficina(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    razao_social TEXT UNIQUE NOT NULL,
    cnpj TEXT,
    status_ofcn INTEGER NOT NULL DEFAULT 1

);


//--------------------------------------------------------------------------------------------- MECÂNICO RESPONSÁVEL
CREATE TABLE IF NOT EXISTS mecanico(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    id_oficina INTEGER NOT NULL,
    status_mcnc INTEGER NOT NULL DEFAULT 1,

    FOREIGN KEY(id_oficina) REFERENCES oficina(id) ON DELETE CASCADE

);