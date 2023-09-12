# DomusIOT
Interface de gerenciamento de dispositivos IOT

## O que é DomusIOT?

DomusIOT é uma interface de gerenciamento via interface web para dispositivos IOT.

# Requisitos de Instalação

* Sistema operacional: Linux (ou WSL);
* Python3;
* Módulo venv do Python3.

# Instalação

1. Clone este repositório.
2. Execute o script `setup.sh`
3. Configure o arquivo `devices.json`

# Configuração

...

# Perguntas Frequentes (FAQ)

## Quais funções estão habilitadas?

É possível ligar, desligar e verificar o status dos dispositivos.

## Quais as tecnologias utilizadas?

O backend utiliza o framework Flask em conjunto com as bibliotecas [tinytuya](https://github.com/jasonacox/tinytuya) e [LGWebOSRemote](https://github.com/klattimer/LGWebOSRemote).
Já o frontend utiliza [Bootstrap](https://getbootstrap.com/).

## Quais funções estão em desenvolvimento?

Tuya:
* Configurar horários de desligamento;
* Gerenciar cores de luzes inteligentes;
* Gerenciar comportamento dos dispositivos na inicialização.

LGTV:
* Controle virtual;
* Gestão de aplicativos.

Geral:
* Exibir estado do dispositivo na tela inicial;
* Configurar ações automatizadas.
