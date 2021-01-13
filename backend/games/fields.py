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
    'themes.name',
]

_company_game_fields = [
    'cover.image_id',
    'first_release_date',
    'name',
    'slug',
]

_company_fields = [
    'country',
    'description',
    'developed',
    'logo',
    'published',
    'slug',
    'start_date',
    'url',
    'websites',
    'name',
]

_company_logo_fields = [
    'height',
    'image_id',
    'url',
    'width',
]

_recent_game_fields = [
    'cover.image_id',
    'first_release_date',
    'name',
    'slug',
]

_upcoming_game_fields = [
    'cover.image_id',
    'first_release_date',
    'name',
    'release_dates.category',
    'slug',
]

_search_fields = [
    'cover.image_id',
    'first_release_date',
    'name',
    'screenshots.image_id',
    'slug',
]

_popular_fields = [
    'game.cover.image_id',
    'game.name',
    'date',
    'game.slug',
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
company_game_fields = ','.join(_company_game_fields)
company_fields = ','.join(_company_fields)
company_logo_fields = ','.join(_company_logo_fields)
recents_fields = ','.join(_recent_game_fields)
upcoming_fields = ','.join(_upcoming_game_fields)
