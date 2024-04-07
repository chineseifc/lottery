"use client";

import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState } from 'react';
import { bscTestnet} from 'viem/chains';


export const PayButton = ({ price }: { price: number }) => {
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
        address: '0x2ac3b0D96231FeB8b45AEd4C3F2622Dc479f8FF7', // token
        functionName: 'approve',
        abi: [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"uint256","name":"totalSupply_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"enum TokenType","name":"tokenType","type":"uint8"}],"name":"TokenCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"allow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
        args: [
          '0xa2d42DE55451B06997Be0F83007aD0d1d4aBc0B1', //rec
          price *1000 * 10 ** 18,
        ],
      })
      setCompleted(true)
      console.log(data)
    } 
    catch(err) {
      console.log(err)
      setStarted(false)
      // @ts-ignore
      setErrors('Approve failed. Please try again.')
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
          {started ? "Confirming..." : "Conncet and Approve"}
        </button>
      )}
      {completed && <p className='text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4'>Approved</p>}
      {errors && <p className='text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4'>{errors}</p>}
    </>
  )
}