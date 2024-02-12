import json
import os
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITransactionTestCase


class CreateSharedLinkTest(APITransactionTestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.user.set_password("12345")
        self.user.save()

    def test_create_shared_link(self):
        view_state = {
            "page_attributes": ["a", "b", "c", "d"],
            "control_values": [
                {"question1": "yes"},
                {"question2": "no"},
                {"question3": "maybe"},
            ],
            "long": "-100.00",
            "lat": "-100.01",
            "zoom": "+500",
        }
        view_json = json.dumps(view_state)
        self.client.force_authenticate(self.user)
        # generate the new link with a 'view-state'
        payload = json.dumps({"view_state": view_json})
        response = self.client.post(
            reverse("planning:create_shared_link"),
            payload,
            content_type="application/json",
        )
        json_response = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            json_response["link_code"].isalnum(), "Returned string is not alphanumeric"
        )

    def test_retrieving_new_link(self):
        view_state = {
            "page_attributes": ["a", "b", "c", "d"],
            "control_values": [
                {"question1": "yes"},
                {"question2": "no"},
                {"question3": "maybe"},
            ],
            "long": "-100.00",
            "lat": "-100.01",
            "zoom": "+500",
        }
        view_json = json.dumps(view_state)
        self.client.force_authenticate(self.user)
        # generate the new link with a 'view-state'
        payload = json.dumps({"view_state": view_json})
        response = self.client.post(
            reverse("planning:create_shared_link"),
            payload,
            content_type="application/json",
        )
        # then fetch the data with the new url
        json_response = json.loads(response.content)
        link_code = json_response["link_code"]
        shared_link_response = self.client.get(
            reverse("planning:get_shared_link", kwargs={"link_code": link_code}),
            content_type="application/json",
        )
        json_get_response = json.loads(shared_link_response.content)
        self.assertJSONEqual(json_get_response["view_state"], view_state)

    def test_retrieving_bad_link(self):
        # then fetch the data with a bad link code
        shared_link_response = self.client.get(
            reverse("planning:get_shared_link", kwargs={"link_code": "madeuplink"}),
            content_type="application/json",
        )
        self.assertEqual(shared_link_response.status_code, 404)
