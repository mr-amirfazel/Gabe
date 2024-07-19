export type ChatItemProps = {
    image?: string,
    username: string,
    time: string,
    last_message: string,
    user_status: string,
    unseen_messages: number,
    roomId: number
}

export type ContactItemProps = {
    image?: string,
    username: string,
    user_status: string,
}

export type UserItemProps = {
    image?: string,
    username: string,
}

export type ItemProps = UserItemProps | ChatItemProps | ContactItemProps
