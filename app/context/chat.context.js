import React, { useState, createContext, useContext, useEffect } from "react"

export const ChatContext = createContext()

export function useChat() {
    const context = useContext(ChatContext)

    if (context === undefined) {
        throw new Error("Função 'useUser' usada fora do contexto!")
    }

    return context
}

export const ChatProvider = (props) => {
    return <ChatContext.Provider value={{}}>
        {props.children}
    </ChatContext.Provider>
}