const { Client } = require('@notionhq/client');
const config = require('./config.json');
const data = require('./Data-Users.json');

const databaseId = config.DATABASE_TOKEN;
const token = config.NOTION_TOKEN;
const Emails = data.emails;
const Names = data.names;

const notion = new Client({
  auth: token,
})

const addUser = async (id,name, email) => {
    await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            ID: {
                number:id
            },
            Name: {
                title: [
                    {
                        text: {
                            content: name
                        }
                    }
                ]
            },
            Email: {
                email:email
            }
        }
    })
};

for (let i = 300; i < Emails.length; i++) {
      setTimeout(() => addUser((i+1),Names[i],Emails[i]), 1000);
}


