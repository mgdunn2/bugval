#!/bin/bash

if [ ! -e "bugval.sqlite" ] ; then
    touch "bugval.sqlite"
fi

sqlite3 bugval.sqlite < create.sql