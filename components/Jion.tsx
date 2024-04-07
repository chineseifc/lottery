"use client";

import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState } from 'react';
import { bscTestnet} from 'viem/chains';


export const Jion = ({ price1 }: { price1: number }) => {
  const { connectAsync } = useConnect()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [started, setStarted] = useState(false)
  const [errors, setErrors] = useState()
  const [completed, setCompleted] = useState(false)

  const handlePayment = async () => {
    try {
      // @ts-ignore
      setErrors('')
      setStarted(true)
      if(!address) {
        await connectAsync({ chainId: bscTestnet.id, connector: injected()})
      }
      const data = await writeContractAsync({
        chainId: bscTestnet.id,
        address: '0xa2d42DE55451B06997Be0F83007aD0d1d4aBc0B1', // token
        functionName: 'playJackpot',
        abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winningAddress","type":"address"}],"name":"JackpotDone","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"participatingAddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"participationNumber","type":"uint256"}],"name":"JackpotEntered","type":"event"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"jackpotCoinPrice0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"jackpotCoinPrice0SourceAmtInBank","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"jackpotCoinPrice0SourceTaxWithdrawAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playJackpot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"retainedForJackpotCoin0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
        args: [],
      })
      setCompleted(true)
      console.log(data)
    } 
    catch(err) {
      console.log(err)
      setStarted(false)
      // @ts-ignore
      setErrors("Jion failed. Please try again.")
    }
  }
  return (
    <>
      {!completed && (
        <button 
          disabled={started}
          className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          onClick={handlePayment}
        >
          {started ? "Confirming..." : "Jion"}
        </button>
      )}
      {completed && <p className='text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4'>Jioned</p>}
      {errors && <p className='text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4'>{errors}</p>}
    </>
  )
}