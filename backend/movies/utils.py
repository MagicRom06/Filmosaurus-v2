import requests

from imdb import IMDb
from bs4 import BeautifulSoup


class Rating:
    def __init__(self, title, year):
        self.title = title
        self.year = year

    @staticmethod
    def load(title, year):
        imdb_rates = Imdb_ratings().load(title, year)
        allocine_rates = Allocine.load(title, year)
        return [allocine_rates, imdb_rates]


class Allocine(Rating):
    
    @staticmethod
    def load(title, year):
        search = Allocine.get_search(title)
        movie_id = Allocine.get_requested_movie_id(search['results'], year)
        rates = Allocine.get_rating(movie_id)
        return rates

    @staticmethod
    def get_search(title):
        url = f"""https://www.allocine.fr/_/autocomplete/{title.capitalize()}"""
        response = requests.get(url)
        return response.json()

    @staticmethod
    def get_requested_movie_id(movie_list, year):
        movie_requested_id = list()
        for elt in movie_list:
            if elt['entity_type'] == 'movie' and \
               (elt['data']['year'] == year or
               elt['data']['year'] == str(int(year) - 1)):
               movie_requested_id.append(elt['entity_id'])
        return movie_requested_id

    @staticmethod
    def get_rating(movie_id):
        print(movie_id)
        if len(movie_id) > 0:
            url = """https://www.allocine.fr/film/fichefilm_gen_cfilm={}.html""".format(movie_id[0])
            html_page = requests.get(url)
            soup = BeautifulSoup(html_page.text, 'html.parser')
            type_critic = soup.find_all("span", "rating-title")
            notes = soup.find_all("span", "stareval-note")
            if len(type_critic) > 1:
                return {
                    "allocine": {
                        "press": f"{notes[0].get_text()}/5",
                        "spectator": f"{notes[1].get_text()}/5",
                        "id": movie_id[0]
                    }
                }
            elif len(type_critic) == 1:
                return {
                    "allocine": {
                        "press": "no data",
                        "spectator": f"{notes[0].get_text()}/5",
                        "id": movie_id[0]
                    }
                }
            else:
                return {
                    "allocine": {
                        "press": "no data",
                        "spectator": "no data",
                        "id": movie_id[0]
                    },
                }
        else:
            return {
                "allocine": {
                    "press": "no data",
                    "spectator": "no data",
                },
            }


class Imdb_ratings:

    @staticmethod
    def load(title, year):
        movie_id = Imdb_ratings.get_id(title, year)
        rate = Imdb_ratings.get_rate(str(movie_id[0]))
        return {'imdb': f"{rate['rating']}/10", 'id': f"tt{movie_id[0]}"}

    @staticmethod
    def get_id(title, year):
        i = 0
        ia = IMDb()
        movie_id = list()
        search = ia.search_movie(title)
        while i < len(search):
            if str(search[i]['year']) == year and search[i]['kind'] == 'movie':
                movie_id.append(search[i].getID())
            i += 1
        return movie_id

    @staticmethod
    def get_rate(movie_id):
        ia = IMDb()
        movie = ia.get_movie(movie_id)
        return movie
