#!/bin/bash

if [ ! -e "moms.sqlite" ] ; then
    touch "moms.sqlite"
fi

sqlite3 moms.sqlite < create.sql