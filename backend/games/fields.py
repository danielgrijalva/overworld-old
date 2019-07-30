_game_fields = [
    'cover.image_id',
    'first_release_date',
    'genres.name',
    'involved_companies.developer',
    'involved_companies.publisher',
    'involved_companies.company.country',
    'involved_companies.company.name',
    'name',
    'platforms.name',
    'screenshots.image_id',
    'slug',
    'summary',
    'time_to_beat.normally',
    'themes.name',
]

_search_fields = [
    'cover.image_id',
    'first_release_date',
    'name',
    'screenshots.image_id',
    'slug',
]

_popular_fields = [
    'cover.image_id',
    'name',
    'popularity',
    'slug',
]

_backdrop_fields = [
    'name',
    'screenshots.image_id',
    'slug',
]

_genre_fields = {
    'name',
    'slug'
}

game_fields = ','.join(_game_fields)
search_fields = ','.join(_search_fields)
popular_fields = ','.join(_popular_fields)
backdrop_fields = ','.join(_backdrop_fields)
genre_fields = ','.join(_genre_fields)
