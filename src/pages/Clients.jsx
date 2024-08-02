import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';
import axios from 'axios';
import { Edit, PlusIcon, Trash } from 'lucide-react';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';

const Clients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [clientToEditInfos, setClientToEditInfos] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    comment: '',
    id: ''
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [clientInfos, setClientsInfos] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    comment: ''
  });

  useEffect(() => {
    const getClient = async () => {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_REACT_API_URL}/endusers`, {
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        })
        .then((res) => {
          setLoading(false);
          setClients(res.data);
        })
        .catch(() => {
          setLoading(false);
          toast.error('Error getting End Users');
        });
    };
    getClient();
  }, []);

  const deleteClient = async (id) => {
    setLoadingDelete(true);
    await axios
      .delete(`${import.meta.env.VITE_REACT_API_URL}/endusers/delete/?id=${id}`, {
        headers: {
          Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
        }
      })
      .then(() => {
        setLoadingDelete(false);
        toast.success('Client deleted');
        setClients(clients.filter((c) => c.id !== id));
        setIdToDelete(null);
      })
      .catch((e) => {
        setLoadingDelete(false);
        toast.error('Error deleting user');
      });
  };

  const addClient = async () => {
    setLoadingAdd(true);
    await axios
      .post(
        `${import.meta.env.VITE_REACT_API_URL}/endusers/store`,
        {},
        {
          params: clientInfos,
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        }
      )
      .then((res) => {
        setLoadingAdd(false);
        setClientsInfos({
          name: '',
          email: '',
          phone: '',
          company: '',
          comment: ''
        });
        toast.success('Client added successfully');
      })
      .catch((e) => {
        setLoadingAdd(false);
        toast.error('Error Adding Client');
      });
  };

  const updateClient = async () => {
    setLoadingUpdate(true);
    await axios
      .patch(
        `${import.meta.env.VITE_REACT_API_URL}/endusers/update`,
        {},
        {
          params: clientToEditInfos ,
          headers: {
            Authorization: 'Bearer 14|oZVlGgeRq3B0wR7grDn9QfxL6jiNwMS29LHxfE62f994cf75'
          }
        }
      )
      .then((res) => {
        setLoadingUpdate(false);
        setClientToEditInfos({ name: '', email: '', phone: '', company: '', comment: '', id: '' });
        toast.success('Client updated successfully');
      })
      .catch((e) => {
        setLoadingUpdate(false);
        toast.error('Error Updating Client');
      });
  };
  return (
    <div className="wrapper">
      <div className="flex gap-4 justify-between items-center">
        <h3 className="capitalize text-xl font-bold">My Clients</h3>
        <Dialog>
          <DialogTrigger>
            <Button className="text-white bg-green-primary hover:bg-green-primary/90 border-none">
              <PlusIcon size={16} />
              <div className="text-sm">Add new client</div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new client</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Tabs defaultValue="infos" className="w-full">
                <TabsList className="w-full flex justify-evenly">
                  <TabsTrigger className="w-full" value="infos">
                    Infos
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="address">
                    Address
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-2 text-black" value="infos">
                  <div className="flex flex-col gap-1">
                    <label>Name</label>
                    <Input
                      value={clientInfos.name}
                      onChange={(e) => setClientsInfos({ ...clientInfos, name: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <Input
                      value={clientInfos.email}
                      onChange={(e) => setClientsInfos({ ...clientInfos, email: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Phone</label>
                    <Input
                      value={clientInfos.phone}
                      onChange={(e) => setClientsInfos({ ...clientInfos, phone: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Company</label>
                    <Input
                      value={clientInfos.company}
                      onChange={(e) => setClientsInfos({ ...clientInfos, company: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>comment</label>
                    <Input
                      value={clientInfos.comment}
                      onChange={(e) => setClientsInfos({ ...clientInfos, comment: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={addClient}
                      disabled={loadingAdd}
                      className="text-white bg-green-primary hover:bg-green-primary/90 border-none mt-1 ">
                      {loadingAdd ? 'Adding client...' : 'Add client'}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="address">Change address here.</TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <div className="h-full flex items-center justify-center mt-12">
          <ClipLoader
            color={'black'}
            loading={loading}
            //cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="mt-4 lg:mt-8">
          <Table className="whitespace-nowrap w-full">
            <TableHeader className="capitalize">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients?.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client?.name}</TableCell>
                  <TableCell>{client?.email}</TableCell>
                  <TableCell>{client?.company}</TableCell>
                  <TableCell>{client?.phone}</TableCell>
                  <TableCell className="max-w-[250px] whitespace-normal">
                    {client?.comment}
                  </TableCell>
                  <TableCell  className='flex gap-3'>
                    <Dialog>
                      <DialogTrigger onClick={() => setIdToDelete(client.id)}>
                        <Trash size={22} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Client</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          Are you sure you want to delete this markup?This action cannot be undone.
                          This will permanently delete this markup.
                        </DialogDescription>

                        <DialogFooter>
                          <Button
                            onClick={() => deleteClient(idToDelete)}
                            disabled={loadingDelete}
                            className="bg-red-500 text-white hover:bg-red-500/90">
                            {loadingDelete ? 'Deletin client...' : 'Delete'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger onClick={() => setClientToEditInfos(client)}>
                        <Edit size={22} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit client</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <Tabs defaultValue="infos" className="w-full">
                            <TabsList className="w-full flex justify-evenly">
                              <TabsTrigger className="w-full" value="infos">
                                Infos
                              </TabsTrigger>
                              <TabsTrigger className="w-full" value="address">
                                Address
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-2 text-black" value="infos">
                              <div className="flex flex-col gap-1">
                                <label>Name</label>
                                <Input
                                  value={clientToEditInfos.name}
                                  onChange={(e) =>
                                    setClientToEditInfos({
                                      ...clientToEditInfos,
                                      name: e.target.value
                                    })
                                  }
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label>Email</label>
                                <Input
                                  value={clientToEditInfos.email}
                                  onChange={(e) =>
                                    setClientToEditInfos({
                                      ...clientToEditInfos,
                                      email: e.target.value
                                    })
                                  }
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label>Phone</label>
                                <Input
                                  value={clientToEditInfos.phone}
                                  onChange={(e) =>
                                    setClientToEditInfos({
                                      ...clientToEditInfos,
                                      phone: e.target.value
                                    })
                                  }
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label>Company</label>
                                <Input
                                  value={clientToEditInfos.company}
                                  onChange={(e) =>
                                    setClientToEditInfos({
                                      ...clientToEditInfos,
                                      company: e.target.value
                                    })
                                  }
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label>comment</label>
                                <Input
                                  value={clientToEditInfos.comment}
                                  onChange={(e) =>
                                    setClientToEditInfos({
                                      ...clientToEditInfos,
                                      comment: e.target.value
                                    })
                                  }
                                />
                              </div>

                              <div className="flex justify-end">
                                <Button
                                  onClick={updateClient}
                                  disabled={loadingUpdate}
                                  className="text-white bg-green-primary hover:bg-green-primary/90 border-none mt-1 ">
                                  {loadingUpdate ? 'Updating client...' : 'Update client'}
                                </Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="address">Change address here.</TabsContent>
                          </Tabs>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Clients;
