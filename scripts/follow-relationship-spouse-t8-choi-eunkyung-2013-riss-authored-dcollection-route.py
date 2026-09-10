#!/usr/bin/env python3
from pathlib import Path
import runpy

TARGET = Path(__file__).with_name(
    'follow-relationship-spouse-t8-choi-eunkyung-2013-riss-authored-wonkwang-route.py'
)
runpy.run_path(str(TARGET), run_name='__main__')
