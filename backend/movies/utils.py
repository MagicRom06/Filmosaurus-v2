from imdb import IMDb


class Rating:
    def __init__(self, title, year):
        self.title = title
        self.year = year

    @staticmethod
    def load(title, year):
        imdb_rates = Imdb_ratings().load(title, year)
        return imdb_rates


class Allocine(Rating):
    def __init__(self, title, year):
        super().__init__(title, year,)


class Imdb_ratings:

    @staticmethod
    def load(title, year):
        movie_id = Imdb_ratings.get_id(title, year)
        rate = Imdb_ratings.get_rate(str(movie_id[0]))
        return {'imdb': rate['rating']}

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
