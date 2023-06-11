<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormProgram;
use App\Models\FormSubject;
use App\Models\ProgramSubject;
use App\Models\Subject;
use App\Models\SubjectCause;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDO;
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
        try {
            $program = $validated['programs'];
            unset($validated["programs"]);

            $validated['user_id'] = 1;
            $form = Form::create($validated);
            $formid = $form['id'];
            foreach ($program as $pro) {
                $data = [
                    'form_id' => $form['id'],
                    'program_id' => $pro
                ];
                FormProgram::create($data);
            }
        } catch (Throwable $e) {
        }

        $form = Form::where('id', $formid)->first();

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
        $validated = $request->validate([
            'subjects' => 'array|min:6|required',
            'form_id' => 'required'
        ]);
        $subjects  = $validated['subjects'];
        foreach ($subjects as $sub) {
            $data = [
                'subject_id' => $sub,
                'form_id' => $validated['form_id']
            ];
            FormSubject::create($data);
        }
        $form = Form::where('id', $validated['form_id'])->first();
        return response()->json([
            'status' => 'OK',
            'data' => $form
        ]);
    }
    /**
     * Display the Recommended and Required
     */
    public function show_rr(Form $id)
    {
        $form = FormProgram::where('form_id', $id['id'])->get();
        $alldata = [];
        foreach ($form as $fo) {
            $data = DB::table('program_subject')
                ->select('name')
                ->where('program_id', $fo['program_id'])
                ->join('subjects', 'program_subject.subject_id', '=', 'subjects.id')
                ->get();
            foreach ($data as $da) {
                array_push($alldata, $da->name);
            }
        }
        $alldata = array_unique($alldata);
        $alldata = array_values($alldata);

        return response()->json([
            'status' => 'OK',
            'data' => $alldata
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show_fs(Form $id)
    {
        $data = DB::table('form_subject')
            ->select('subject_id', 'name')
            ->where('form_id', $id['id'])
            ->join('subjects', 'form_subject.subject_id', '=', 'subjects.id')
            ->get();

        return response()->json([
            'status' => 'OK',
            'data' => $data
        ]);
    }

    /**
     * Create the subject Cause 
     */
    public function stepthree(Request $request)
    {
        $validated = $request->validate([
            'causes' => 'array|required',
            'form_id' => 'required'
        ]);
        $causes = $validated['causes'];
        foreach ($causes as $cas) {
            $data = [
                'form_id' => $validated['form_id'],
                'subject_id' => $cas['subject_id'],
                'isGood' => $cas['isGood'],
                'isInterested' => $cas['isInterested'],
                'isRequired' => $cas['isRequired']
            ];
            SubjectCause::create($data);
        }

        $form = Form::where('id', $validated['form_id'])->get();

        return response()->json([
            'status' => 'OK',
            'data' => $form
        ]);
    }

    /**
     * Save the meeting person and time
     */
    public function stepfour(Request $request)
    {
        $validated = $request->validate([
            'form_id' =>  'required',
            'meeting_time' => 'required',
            'meeting_person' => 'required'
        ]);
        $id = $validated['form_id'];
        unset($validated['form_id']);
        Form::where('id', $id)->update($validated);
        $form =   Form::where('id', $id)->get();
        return response()->json([
            'status' => 'OK',
            'data' => $form
        ]);
    }

    /**
     * Get All data for the final
     */

    public function finalstep(Form $id)
    {
        $program = DB::table('form_program')
            ->select('name')
            ->where('form_id', $id['id'])
            ->join('programs', 'form_program.program_id', '=', 'programs.id')
            ->get();
        $data1 = [];
        foreach ($program as $pro) {
            array_push($data1, $pro->name);
        }

        $subject = DB::table('form_subject')
            ->select('name')
            ->where('form_id', $id['id'])
            ->join('subjects', 'form_subject.subject_id', '=', 'subjects.id')
            ->get();
        $data2 = [];
        foreach ($subject as $sub) {
            array_push($data2, $sub->name);
        }


        $alldata = [
            'programs' => $data1,
            'subjects' => $data2,
            'form' => $id
        ];
        return response()->json([
            'status' => 'OK',
            'data' =>  $alldata
        ]);
    }
}
