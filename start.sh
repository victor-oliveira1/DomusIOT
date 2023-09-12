#!/usr/bin/env bash
which gunicorn &> /dev/null || {
    source runtime/bin/activate
}

gunicorn app:app
