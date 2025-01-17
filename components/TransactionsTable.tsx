import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils';
import { transactionCategoryStyles } from '@/constants';

const CategoryBadge = ({ category}: CategoryBadgeProps) => {
    const { borderColor, backgroundColor, textColor, chipBackgroundColor } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default

    return (
        <div className={cn('category-badge', borderColor,chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full',backgroundColor)} />
            <p className={cn('text-[12px] font-medium',textColor)}>
                {category}
            </p>
        </div>
    )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    return (
        <Table>
            <TableHeader className='bg-[#f9fafb]'>
                <TableRow>
                    <TableHead className="px-1">Transaction</TableHead>
                    <TableHead className="px-1">Amount</TableHead>
                    <TableHead className="px-1">Status</TableHead>
                    <TableHead className="px-1">Date</TableHead>
                    <TableHead className="px-1 max-md:hidden">Channel</TableHead>
                    <TableHead className="px-1 max-md:hidden">Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date))
                    const amount = formatAmount(t.amount)
                    const isDebit = t.type === 'debit';
                    const isCredit = t.type === 'credit';

                    return (
                        <TableRow key={t.$id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
                            <TableCell className='max-w-[200px] pl-1 pr-1'>
                                <div className='flex items-center gap-3'>
                                    <h1 className='text-14 truncate font-semibold text-[#344054]'>
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className={`pl-1 pr-1 font-semibold ${isDebit || amount[0] === '-' ? 'text-[#f04438]': 'text-[#039855]'}`}>
                                {isDebit ? `-${amount}` : isCredit ? amount : amount}
                            </TableCell>
                            <TableCell className='pl-1 pr-1'>
                                <CategoryBadge category={status} />
                            </TableCell>
                            <TableCell className='min-w-32 pl-1 pr-1'>
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className='pl-1 pr-1 capitalize min-w-24'>
                                {t.paymentChannel}
                            </TableCell>
                            <TableCell className='pl-1 pr-1 max-md:hidden'>
                            <CategoryBadge category={t.category} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
}

export default TransactionsTable
