# Lab Report : Goshawk Lab

## Environment Configuration

I use docker to launch the project.

Firstly, I configure proxy for my WSL using clash and launch docker demaon (so as to access the docker hub).

Then I run `docker pull mmmiracle/goshawk`.

Then I launch the docker runtime using `docker run -it -v /mnt/d/CS3312_wltu/Lab2_Program_Analysis/goshawk/sample_project:/workspace/sample_project mmmiracle/goshawk`.

## Program Analysis

I run goshawk program using the script [run.sh](run.sh). The analysis result is located at [output.log](output.log).