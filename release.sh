set -e

if [[ -z $1 ]]; then
    echo "Enter release type (major, minor, patch): "
    read TYPE
else
    TYPE = patch
fi

read -p "Releasing a $TYPE version - are you sure? (y/n) " -n 1 -r
echo

if [[ $REPLY == ^[Yy]$ ]]; then
    echo "Releasing a $TYPE version..."

    # Build and Version
    npm version $TYPE -m "[Release] %s"

    # Publish
    npm publish
fi


