from aiohttp import web
from aiohttp.web_response import Response
import json
from storage import Storage
import aiohttp_cors

storageConnection = Storage('users.json','posts.json')
storageConnection.fetchUserFromJSON()
storageConnection.fetchPostsFromJSON()
userStorage = storageConnection.storage['users']
postStorage = storageConnection.storage['posts']

# HANDLING USER REQUESTS
async def handle(request):
    return web.json_response(userStorage[0],headers= {
        'Access-Control-Allow-Origin': 'null'
    })

async def handler(request):
    return web.json_response(userStorage[0])

async def handleUserID(request):
    id = int(request.match_info.get('userID', 0))
    return web.json_response(userStorage[id])

async def handleUsers(request):
    return web.json_response(userStorage)

async def handleAddingUsers(request):
    if request.can_read_body:
        body = await request.json()
        try:
            first_name = body['first_name']
            second_name = body['second_name']
            print(first_name,' ',second_name)
            storageConnection.addUser(first_name,second_name)
            return web.Response(text=f'User listed below has been added.\n{first_name} {second_name}')
        except:
            return web.Response('There has been problem with processing your data')
    else:
        return web.Response(text="Error! Nothing was provided to be added.")

# HANDLING POSTS REQUESTS
async def handlePostID(request):
    id = int(request.match_info.get('postID', 0))
    return web.json_response(userStorage[id])

async def handlePosts(request):
    return web.json_response(postStorage)        

async def handleAddingPosts(request):
    if request.can_read_body:
        body = await request.json()
        try:
            author_id = body['author_id']
            post_text = body['post_text']
            print(f'{post_text}\n by {author_id}')
            storageConnection.addPost(author_id,post_text)
            return web.Response(text=f'Post listed below has been added.\n{post_text}')
        except:
            return web.Response(text='There has been problem with proccessing your data')
    else:
        return web.Response(text="Error! Nothing was provided to be added.")

app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/users', handleUsers),
                web.get('/users/{userID}', handleUserID),
#                web.get('/posts', handlePosts),
                web.get('/posts/{postID}', handlePostID),
                web.post('/add-user', handleAddingUsers),
#                web.post('/add-post', handleAddingPosts)
                ])

cors = aiohttp_cors.setup(app)

get_posts = cors.add(app.router.add_resource("/posts"))
get_posts_route = cors.add(
    get_posts.add_route("GET", handlePosts), {
        "http://localhost:3000": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    })

post_posts = cors.add(app.router.add_resource("/add-post"))
post_posts_route = cors.add(
    post_posts.add_route("POST", handleAddingPosts), {
        "http://localhost:3000": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    }
)

if __name__ == '__main__':
    web.run_app(app)