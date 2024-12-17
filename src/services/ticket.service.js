import {v4 as uuid} from 'uuid'
import { ticketDao } from '../dao/mongo/ticket.dao.js'
import { sendTicketMail } from '../utils/sendMail.js'
class TicketService{
    async createTicket(amount, userMail){
        const newTicket = {
            code:uuid(),
            purchaser:userMail,
            amount: amount,
        }
        const ticket =  await ticketDao.create(newTicket)

        await sendTicketMail(userMail,ticket)
        return  ticket
    }

}

export const ticketService = new TicketService();