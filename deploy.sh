#!/usr/bin/env bash
# A script used by docker-compose to perform a number of deploy tasks
# when re-launching a django service container.
# It includes:
# 1  - running django migrations (to update model schema and data)
# 2  - running django collecstatic (to update static files)
# 3  - running django compilemessages (to apply translations)
# 4  - running django makemessages -a (to update translation files)
# 5  - creating a django superuser account (if it doesn't yet exist)
# 6  - loading initial fixtures as demo data (for testing)
# 7  - quickstarting sphinx documentation (if not started yet)
# 9  - building sphinx documentation
# 10 - running django worker (effectively starting the server)

python src/manage.py makemigrations user
python src/manage.py migrate user
python src/manage.py makemigrations
python src/manage.py migrate
echo yes | python src/manage.py collectstatic
django-admin compilemessages
django-admin makemessages -l pt
echo 'import os; \
      from django.contrib.auth import get_user_model; \
      get_user_model().objects.create_superuser(os.environ["DJ_SUPERUSER"], os.environ["DJ_SUPERUSER_PASS"])' | python src/manage.py shell
python src/manage.py loaddata demo
sphinx-build -b html \
             -D project="${PROJECT_NAME}" \
             -D copyright="$(date +'%Y') ${SPHINX_AUTHOR_NAME}" \
             -D author="${SPHINX_AUTHOR_NAME}" \
             -D version="${SPHINX_VERSION}" \
             -D release="${SPHINX_RELEASE}" \
             docs/ \
             docs/_build
python src/manage.py runworker
