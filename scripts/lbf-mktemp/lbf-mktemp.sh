#!/bin/bash
# LBF Compiler - lbf-mktemp
# Create a temporary folder.
# Takes arguments: lbf-mktemp <project file name>
#   <project file name> is expected to be a file name to include in the tmp file. Defaults to 'unspecified'.

file_name="$1"
file_name="${file_name:-unspecified}"

log_buffer=""

log_debug() {
    [[ "$DEBUG" -eq 1 ]] && echo "$(date "+%H:%M:%S") lbf  mktemp: $1" 2>&1
    log_buffer="$log_buffer$(date "+%H:%M:%S") lbf  mktemp: $1
";
}

log_debug "make temp dir base with file_name $file_name"
dir="$(mktemp -d /tmp/lbf-tmp.$file_name.XXXXXXXX.tmp)"
log_debug "finished making temp dir $dir"
log_debug "make dir struct in $dir"
log_debug "  /sources"
mkdir $dir/sources
log_debug "  /logs"
mkdir $dir/logs
log_debug "  /logs/lbf-mktemp"
mkdir $dir/logs/lbf-mktemp
log_debug "done with making logs structure"
log_debug "write log buffer to temp file"
echo -n "$log_buffer" >> $dir/logs/lbf-mktemp/lbf-mktemp.log
echo "$dir"
