#!/bin/sh
# Use this script to wait for other services to be ready before starting your application.
# More info: https://github.com/vishnubob/wait-for-it

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host"; do
  >&2 echo "$host is unavailable - sleeping"
  sleep 1
done

>&2 echo "$host is up - executing command"
exec $cmd