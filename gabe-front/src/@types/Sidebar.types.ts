export type ChatItemProps = {
    image?: string,
    name: string,
    time?: string,
    last_message: string,
    user_status: string,
    unseen_messages: number,
    roomId: number
}

export type ContactItemProps = {
    image?: string,
    name: string,
    user_status: string,
}

export type UserItemProps = {
    image?: string,
    name: string,
}

export type ItemComponentProps = {
    item: UserItemProps | ChatItemProps | ContactItemProps
}