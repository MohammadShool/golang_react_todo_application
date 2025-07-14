import { useState } from "react"
import {useForm} from "@mantine/form"
import {Modal, Group, Button, TextInput, Textarea} from "@mantine/core"
import { ENDPOINT, type Todo } from "../src/App";
import type { KeyedMutator } from "swr";
function AddTodo({mutate}: {mutate: KeyedMutator<Todo[]>}) {
    const [isopen, setOpen] = useState<boolean>(false)
    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        }
    });

    async function createTodo(values: {title: string, body: string}){
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(values),
        }).then(r=>r.json())

        mutate(updated)
        form.reset()
        setOpen(false)
    }

    return (
        <>
            <Modal opened={isopen} onClose={()=>setOpen(false)} title="Create todo">
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput 
                        required
                        mb={12}
                        label = "Todo"
                        placeholder="what do you want to do?"
                        {...form.getInputProps("title")}
                    />
                    <Textarea 
                    required
                        mb={12}
                        label = "Body"
                        placeholder="tell me more..."
                        {...form.getInputProps("body")}
                    />

                    <Button type="submit">Create Todo</Button> 
                </form>
            </Modal>

            <Group>
                <Button fullWidth mb={12} onClick={()=>setOpen(true)}>
                    ADD TODO
                </Button>
            </Group>

        </>
    )
}

export default AddTodo