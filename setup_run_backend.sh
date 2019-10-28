#!/bin/bash
# Copy env file?

IS_PYTHON3=false

# Install backend dependencies
install_backend() {
  cd backend

  # Check which version of Python is the default, then try to install requirements
  if echo "$(python -V 2>&1)" | grep -c "Python 2" > /dev/null 2>&1; then
    if command -v python3 > /dev/null 2>&1; then
      echo "Installing requirements via pip3."
      IS_PYTHON3=true
      pip3 install -r requirements.txt
    else
      echo "Your default Python is version 2. This project uses Python 3. Please install it and try again."
      exit 1;
    fi
  else
    echo "Installing requirements via pip."
    pip install -r requirements.txt
  fi
}

# Migrate and run
migrate_run_backend() {
  if $IS_PYTHON3; then
    echo "Migrating via python3."
    python3 manage.py migrate
    echo "Running server via python3."
    python3 manage.py runserver
  else
    echo "Migrating via python."
    python manage.py migrate
    echo "Running server via python."
    python manage.py runserver
  fi
}

do_backend_stuff() {
  install_backend
  migrate_run_backend
  cd ..
}

# Check if any version of Python is available
if command -v python > /dev/null 2>&1; then
  do_backend_stuff
else
  if command -v brew > /dev/null 2>&1; then
    if ! command -v pg_config > /dev/null 2>&1; then
      while true; do
        read -p "This project requires pg_config, which is part of postgresql. Would you like to install postgresql (via Homebrew)?" yn
        case $yn in
          [Yy]* ) brew install postgresql;;
          [Nn]* ) exit;;
          * ) echo "Please answer yes or no.";;
        esac
      done
    fi
    while true; do
      read -p "This project requires Python 3. Would you like to install it (via Homebrew)?" yn
      case $yn in
        [Yy]* ) brew install python; do_backend_stuff;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
      esac
    done
  else
    echo "This project requires Python 3. Please install it and try again."
    exit 1;
  fi
fi
