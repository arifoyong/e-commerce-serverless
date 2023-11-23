import Link from 'next/link'
import Image from 'next/image'
import { IProduct } from '@/types/product'
import config  from '@/lib/aws-config'
import { ColumnDef,flexRender,getCoreRowModel,useReactTable } from "@tanstack/react-table"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { FileEdit } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "sk",
    header: " ",
    cell: ({ row }) => {
      const sk: string = row.getValue('sk')
      return (
      <Link href={`/admin/products/${sk.replace('p#', '')}`}
        className='text-muted-foreground hover:text-primary transition-all'
      >
        <FileEdit />
      </Link>
    )}
  },
  {
    accessorKey: "pictures",
    header: "Picture",
    cell: ({ row }) => { 
      const picURL = row.getValue('pictures')
      if (picURL && picURL !== '') {
      return (
          < Image src={`${config.cdn.URL}/public/${picURL}`}
              className="w-full h-[12rem] object-contain scale-100 group-hover:scale-125 ease-in transition-all"
              width={0}
              height={0}
              sizes="100vw"
              alt={''} />
    )}
      }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "profile",
    header: "Profile",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "option",
    header: "Option",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
 
  return (
    <div className="rounded-md border">
      <Table className='border-separate'>
        <TableHeader className='sticky top-[55px] z-50 rounded-lg bg-white rounded-md'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow  key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className='border-b'
                     key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                {row.getVisibleCells().map((cell) =>  { 
                  return (
                    <TableCell className='border-b' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )}  
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}