'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function RegistroUsuario() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const validarFormulario = () => {
    if (!email || !senha || !confirmacaoSenha) {
      setErro('Todos os campos são obrigatórios.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro('Por favor, insira um email válido.')
      return false
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return false
    }
    if (senha !== confirmacaoSenha) {
      setErro('As senhas não coincidem.')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso(false)

    if (validarFormulario()) {
      // Simula o envio para um servidor
      console.log('Dados de registro:', { email, senha })
      // Limpa os campos e mostra mensagem de sucesso
      setEmail('')
      setSenha('')
      setConfirmacaoSenha('')
      setSucesso(true)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>Registre-se para acessar nossa plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmacao-senha">Confirmar Senha</Label>
              <Input
                id="confirmacao-senha"
                type="password"
                value={confirmacaoSenha}
                onChange={(e) => setConfirmacaoSenha(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Registrar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          {erro && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{erro}</AlertDescription>
            </Alert>
          )}
          {sucesso && (
            <Alert className="mt-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>Sua conta foi criada com sucesso!</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}