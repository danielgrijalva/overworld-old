_fields = [
    'deck',
    'description',
    'developers',
    'expected_release_year',
    'genres',
    'guid',
    'image',
    'images',
    'image_tags',
    'name',
    'original_game_rating',
    'original_release_date',
    'people',
    'platforms',
    'publishers',
    'site_detail_url',
    'themes',
]

_search_fields = [
    'expected_release_year',
    'guid',
    'name',
    'original_release_date',
]

fields = ','.join(_fields)
search_fields = ','.join(_search_fields)
