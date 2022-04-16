SCRIPTDIR=$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
set -e
cd "$SCRIPTDIR"
cd .. # now we are in the lbf source folder

echo_debug() {
    if [[ "$DEBUG" == 1 ]]; then
        echo "lbfpp: DEBUG: $1"
    fi
}

echo_debug "Attempt to read file $1"

if [[ ! -f "$1" ]]; then
    echo "lbfpp: ERROR: File not found: $1"
    exit 1
fi

echo_debug "File exists. Read file $1 into memory..."
CONTENTS="$(cat "$1")"
echo_debug "Read $(echo "$CONTENTS" | wc -l) lines from file $1."

echo_debug "Invoke src/lbfpp/01-versioning.js with node..."
CONTENTS="$(DEBUG="$DEBUG" node src/lbfpp/01-versioning.js "$CONTENTS")"
echo_debug "Comments parsed."

echo_debug "Invoke src/lbfpp/02-directives.js with node..."
CONTENTS="$(DEBUG="$DEBUG" node src/lbfpp/02-directives.js "$CONTENTS")"
echo_debug "Directives parsed."
echo "$CONTENTS"