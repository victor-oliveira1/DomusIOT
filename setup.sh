#!/usr/bin/env bash
echo
echo '    ____                             ________  ______'
echo '   / __ \____  ____ ___  __  _______/  _/ __ \/_  __/'
echo '  / / / / __ \/ __ `__ \/ / / / ___// // / / / / /   '
echo ' / /_/ / /_/ / / / / / / /_/ (__  )/ // /_/ / / /    '
echo '/_____/\____/_/ /_/ /_/\__,_/____/___/\____/ /_/     '
echo '                                                     '

echo
echo '== Configurando ambiente virtual Python =='
python3 -m venv runtime

echo
echo '== Instalando bibliotecas necessárias =='
source runtime/bin/activate
pip install -r requirements.txt > /dev/null
deactivate

while :; do
    echo '== Deseja buscar os dispositivos Tuya? (s/n) =='
    read -ep '> ' OPTION
    case "$OPTION" in
        s|S)
            python3 -m tinytuya wizard
            break
            ;;
        n|N)
            break
            ;;
        *)
        echo "Selecione uma opção"
    esac
done

while :; do
    echo '== Deseja buscar os dispositivos LGTV? (s/n) =='
    read -ep '> ' OPTION
    case "$OPTION" in
        s|S)
            lgtv scan
            break
            ;;
        n|N)
            break
            ;;
        *)
        echo "Selecione uma opção"
    esac
done

echo
echo '== Configuração inicial realizada! =='
echo
