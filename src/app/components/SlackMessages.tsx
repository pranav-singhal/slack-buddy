
export type SlacKMessage = {
    message: string,
    id: string
}

const SlackMessages = (props: any) => {
const messages: SlacKMessage[] = props.messages;

if (messages.length === 0) {
    return (
        <div>
            no slack messages have been intercepted
        </div>
    )
}

return (
    <ul>
        {
            messages.map(_message => {
                return (
                    <li key={_message.id}>
                            {_message.message}
                    </li>
                )
            })
        }
    </ul>
)
}

export default SlackMessages;