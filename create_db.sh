#!/bin/bash

if [ ! -e "bugval.sqlite" ] ; then
    touch "bugval.sqlite"
    sqlite3 bugval.sqlite < create.sql
fi