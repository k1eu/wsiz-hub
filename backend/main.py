from aiohttp import web
from aiohttp.web_response import Response
import json
from storage import Storage

storageConnection = Storage('users.json','posts.json')
storageConnection.fetchUserFromJSON()
userStorage = storageConnection.storage['users']

#template implementation of server
async def handle(request):
    return web.json_response(userStorage[0])

async def handleUserID(request):
    id = int(request.match_info.get('userID', 0))
    return web.json_response(userStorage[id])

async def handleUsers(request):
    id = int(request.match_info.get('userID', 0))
    return web.json_response(userStorage)

async def handleAdding(request):
    if request.can_read_body:
        body = await request.json()
        print(body["first_name"])
        storageConnection.addUser(body["first_name"],body["second_name"])
        return web.Response(text=f'User listed below has been added.\n{body}')
    else:
        return web.Response(text="Error! Nothing was provided to be added.")

app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/users/{userID}', handleUserID),
                web.get('/users', handleUsers),
                web.post('/add-user', handleAdding)])

if __name__ == '__main__':
    web.run_app(app)