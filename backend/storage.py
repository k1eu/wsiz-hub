import json
from datetime import datetime
class Storage:
    storage = {}
    storage['users'] = []
    storage['posts'] = []
    filename_users : str
    filename_posts : str

    def __init__(self, filename_users: str, filename_posts) -> None:
        self.filename_users = filename_users
        self.filename_posts = filename_posts


    # USERS MANAGEMENT  PART    
    def fetchUserFromJSON(self):
        with open(self.filename_users) as json_file:
            data = json.load(json_file)
            for user in data:
                self.storage['users'].append(user)

    def writeUsersToJSON(self):
        with open(self.filename_users, 'w') as outfile:
            json.dump(self.storage['users'], outfile)

    def getUsersMaxId(self) -> int:
        return len(self.storage['users'])

    def addUser(self, first_name, second_name):
        temp_usr = {
            'id' : self.getUsersMaxId()+1,
            'first_name' : first_name,
            'second_name' : second_name
        }
        self.storage['users'].append(temp_usr)
        self.writeUsersToJSON()

    def listUsers(self):
        return self.storage['users']

    # POST MANAGEMENT PART

    def fetchPostsFromJSON(self):
        with open(self.filename_posts) as json_file:
            data = json.load(json_file)
            for post in data:
                self.storage['posts'].append(post)
    
    def writePostsToJSON(self):
        with open(self.filename_posts, 'w') as outfile:
            json.dump(self.storage['posts'], outfile)
    
    def getPostsMaxId(self) -> int:
        return len(self.storage['posts'])
    
    def addPost(self, author_id, post_text):
        curr_date = str(datetime.now().replace(microsecond=0))
        temp_post = {
            'post_id' : self.getPostsMaxId()+1,
            'author_id' : author_id,
            'creation_time' : curr_date,
            'post_text' : post_text,
            'comments' : []
        }
        self.storage['posts'].append(temp_post)
        self.writePostsToJSON()

    def listPosts(self):
        return self.storage['posts']


""" Saving to file
with open('data.json', 'w') as outfile:
    json.dump(files.userStorage, outfile)
-----
with open('data.txt') as json_file:
    data = json.load(json_file)
    for p in data['people']:
        print('Name: ' + p['name'])
        print('Website: ' + p['website'])
        print('From: ' + p['from'])
        print('')
Opening a file
print(files.userStorage['users'][3]['second_name'])
"""