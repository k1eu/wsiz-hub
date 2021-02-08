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
        users_nr = len(self.storage['users'])
        return self.storage['users'][users_nr-1]['id']

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

    def getUserDetailsFromId(self,id):
        users_number = len(self.storage['users'])
        if id-1 >= users_number:
            tempId = self.storage['users'][users_number-1]['id']
            if id > tempId:
                return 'error'
        else:
            tempId = self.storage['users'][id-1]['id']
        if tempId != id:
            if tempId > id:
                for i in range(tempId,-1,-1):
                    try:
                        if self.storage['users'][i]['id'] == id:
                            return self.storage['users'][i]
                    except:
                        return 'error'
            elif tempId < id:
                for i in range(tempId,len(self.storage['users'])):
                    try:
                        if self.storage['users'][i]['id'] == id:
                            return self.storage['users'][i]
                    except:
                        return 'error'

        else :
            print(id, tempId)
            return self.storage['users'][id-1]

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
        posts_nr = len(self.storage['posts'])
        return self.storage['posts'][posts_nr-1]['post_id']
    
    def addPost(self, author_id, post_text):
        curr_date = str(datetime.now().replace(microsecond=0))
        first_name = self.getUserDetailsFromId(author_id)['first_name']
        second_name = self.getUserDetailsFromId(author_id)['second_name'] 
        author_name = f'{first_name} {second_name}'
        temp_post = {
            'post_id' : self.getPostsMaxId()+1,
            'author_id' : author_id,
            'author_name' : author_name,
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