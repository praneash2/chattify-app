import crypto from 'crypto';

export const hashFunction = (userId:number, N:number) => {
  const hash = crypto.createHash('sha256');
  hash.update(userId.toString());
  const hashValue = parseInt(hash.digest('hex'), 16);
  
  return hashValue % N;
};

