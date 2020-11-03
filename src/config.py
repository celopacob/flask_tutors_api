import os


def get_sqlite_db_file(filename):
    project_dir = os.path.dirname(os.path.abspath(__file__))
    sqlite_db_file = "sqlite:///{}".format(os.path.join(project_dir, filename))

    return sqlite_db_file


class Development(object):
    """
    Development environment configuration
    """
    DEBUG = True
    TESTING = False
    JSON_SORT_KEYS = False

    database_file = get_sqlite_db_file("../data/tutordatabase.db")
    SQLALCHEMY_DATABASE_URI = database_file

    # We can always set system environment
    # variables so we don't need to set variables on the code

    # SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')


class Testing(object):
    """
    Development environment configuration
    """
    TESTING = True

    database_file = get_sqlite_db_file("../data/test.db")

    SQLALCHEMY_DATABASE_URI = database_file
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class Production(object):
    """
    Production environment configurations
    """
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')


app_config = {
    'development': Development,
    'testing': Testing,
    'production': Production,
}
