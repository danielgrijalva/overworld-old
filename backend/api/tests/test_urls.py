from django.test import SimpleTestCase
from django.urls import reverse, resolve
from api.views import (get_game, get_popular_games, get_game_country,
                       Actions,
                       Log, Unlog,
                       Like, Unlike,
                       Wishlist, RemoveWishlist,
                       Backlog, RemoveBacklog,
                       Rate,
                       search_game,
                       get_screenshots,
                       get_igdb_cover)


class TestUrls(SimpleTestCase):
    # def test_games_url_is_resolved(self):
    #     url = reverse('games', args='some_game_guid')
    #     print(resolve(url))
    #     self.assertEquals(resolve(url).func.view_class, get_game)

    def test_actions_url_is_resolved(self):
        url = reverse('actions')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Actions)

    def test_actions_log_url_is_resolved(self):
        url = reverse('actions/log')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Log)

    def test_actions_unlog_url_is_resolved(self):
        url = reverse('actions/unlog')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Unlog)

    def test_actions_like_url_is_resolved(self):
        url = reverse('actions/like')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Like)

    def test_actions_unlike_url_is_resolved(self):
        url = reverse('actions/unlike')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Unlike)

    def test_actions_wishlist_url_is_resolved(self):
        url = reverse('actions/wishlist')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Wishlist)

    def test_actions_remove_wishlist_url_is_resolved(self):
        url = reverse('actions/remove-wishlist')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, RemoveWishlist)

    def test_actions_backlog_url_is_resolved(self):
        url = reverse('actions/backlog')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Backlog)

    def test_actions_remove_backlog_url_is_resolved(self):
        url = reverse('actions/remove-backlog')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, RemoveBacklog)

    def test_actions_ratings_url_is_resolved(self):
        url = reverse('actions/ratings')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Rate)

    # def test_search_url_is_resolved(self):
    #     url = reverse('search', args='some_search')
    #     print(resolve(url))
    #     self.assertEquals(resolve(url).func.view_class, search_game)
    #
    # def test_screenshots_url_is_resolved(self):
    #     url = reverse('actions/ratings', args='some_screenshot_guid')
    #     print(resolve(url))
    #     self.assertEquals(resolve(url).func.view_class, get_screenshots)
    #
    # def test_games_country_url_is_resolved(self):
    #     url = reverse('games/country', args='some_publisher_id')
    #     print(resolve(url))
    #     self.assertEquals(resolve(url).func.view_class, get_game_country)

    def test_popular_url_is_resolved(self):
        url = reverse('popular')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, get_popular_games)

    # def test_igdb_cover_url_is_resolved(self):
    #     url = reverse('igdb/cover', args=1234)
    #     print(resolve(url))
    #     self.assertEquals(resolve(url).func.view_class, get_igdb_cover)

    def test_users_url_is_resolved(self):
        url = reverse('users')
        print(resolve(url))
