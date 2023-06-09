<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormProgram;
use App\Models\ProgramSubject;
use Exception;
use Illuminate\Http\Request;
use Throwable;

use function PHPSTORM_META\map;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Initiate new Form with program
     */
    public function stepone(Request $request)
    {
        $validated = $request->validate([
            'programs' => 'required|array|max:3|min:1'
        ]);
        $formid = '';
        try{
            $program = $validated['programs'];
            unset($validated["programs"]);
            
            $validated['user_id'] = 1;
            $form = Form::create($validated);
            $formid = $form['id']; 
            foreach($program as $pro){
                $data = [
                    'form_id' => $form['id'],
                    'program_id' => $pro
                ];
                FormProgram::create($data);
            }
        }catch(Throwable $e){

        }

        $form = Form::where('id',$formid)->get();

        return response()->json([
            'status' => "OK",
            'data' => $form
        ], 201);
    }


     /**
     * Create the subject choose
     */
    public function steptwo(Request $request)
    {

    }
    /**
     * Display the Recommended and Required
     */
    public function show_rr(Form $id)
    {
        $form = FormProgram::where('form_id', $id['id'])->get();
        $alldata = [];
        foreach($form as $fo){
            $data = ProgramSubject::where('program_id', $fo['program_id'])->get();
            $alldata+=$data; 
        }
        dd($alldata);

        return response()->json([
            'status' => 'OK',
            'data' => $alldata
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Form $form)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        //
    }
}
