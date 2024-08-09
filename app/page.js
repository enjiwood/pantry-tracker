'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect} from 'react';
import { firestore } from '@/firebase';
import { Box, Modal, Stack, Typography, TextField, Button, IconButton } from '@mui/material'
import { collection, getDocs, query, deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }
    else{
      await setDoc(docRef, {count: 1})
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent = "center" alignItems="center" gap={2}>
      <Modal open={open} close={handleClose}>
        <Box
        position="absolute"
        top="50%" left="50%"
        width={400}
        bgcolor ="white"
        border="2px solid #FFF"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx = {{
          transform: "translate(-50%, -50%)",
        }}>
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction = "row" spacing ={2}>
            <TextField
            variant = "filled"
            color = "secondary"
            fullWidth
            value = {itemName}
            onChange = {(e) =>{
              setItemName(e.target.value)
            }}
            sx = {{
              border:"2px solid #FFF",
            }}
            />
            <Button variant="outlined" onClick = {() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant = "text" onClick = {() => {
        handleOpen()
      }}
      ><Typography color="#E7E6F7">Add New Item</Typography></Button>
      <Box border = "1px solid #333" borderRadius="15px" boxShadow="0px 0px 200px #6874E8">
        <Box width="800px" height="100px" bgcolor="#6874E8" borderRadius="15px 15px 0px 0px" 
        alignItems = "center" justifyContent = "center" display = "flex">
          <Typography variant = 'h2' color = "#CCDDE2">
            Inventory Items
          </Typography>
        </Box>
      
      <Stack width="800px" height="500px"  spacing={2} overflow="auto" borderRadius="0px 0px 15px 15px">
        {
          inventory.map(({name, count}) => (
            <Box key={name} width="100%" minHeight="75px" maxHeight="75px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#1F1F1F" padding={5}>
              <Typography variant="h3" color="#CCDDE2" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Stack direction="row" spacing={5}>
                <Typography variant="h3" color="#CCDDE2" textAlign="center">
                  {count}
                </Typography>
                <IconButton variant="text" color="success" onClick = {() => {
                  addItem(name)
                }}><AddIcon /></IconButton>
                <IconButton variant="text" color="error" size="large" onClick = {() => {
                  removeItem(name)
                }}><RemoveIcon /></IconButton>
              </Stack>
            </Box>
          ))
        }
      </Stack>
      </Box>
    </Box>
  );
}
