import clientPromise from '../../lib/mongo';

let cachedClient: any = null;
let cachedDb: any = null;

async function handler(req: any, res: any) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db('blog');

  if (method === 'GET') {
    const messages = await db.collection('messages').find({}).toArray();
    res.status(200).json(messages);
  } else {
    res.status(405).end();
  }
}

export default handler;
